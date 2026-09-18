import { access,readFile,readdir } from "node:fs/promises";
import { dirname,join,resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root=join(dirname(fileURLToPath(import.meta.url)),"..");
const out=join(root,"dist");
const files=[];
const fail=[];
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const path=join(dir,entry.name);if(entry.isDirectory())await walk(path);else if(entry.name.endsWith(".html"))files.push(path)}}
await walk(out);
for(const file of files){
  const html=await readFile(file,"utf8");
  for(const required of ["<title>",'name="description"','rel="canonical"','lang="'])if(!html.includes(required))fail.push(`${file}: missing ${required}`);
  if(!html.includes('id="main"'))fail.push(`${file}: missing main`);
  for(const match of html.matchAll(/(?:src|href)="(\/information-processing-engineer-exam-prep-web\/[^"?#]+)"/g)){
    const relativePath=match[1].replace("/information-processing-engineer-exam-prep-web/","");
    if(/^(ko|en|assets)\//.test(relativePath)){
      let target=resolve(out,relativePath);
      if(!target.includes("."))target=join(target,"index.html");
      try{await access(target)}catch{fail.push(`${file}: broken ${match[1]}`)}
    }
  }
}
for(const path of ["index.html","404.html","sitemap.xml","robots.txt",".nojekyll","ko/index.html","en/index.html"])try{await access(join(out,path))}catch{fail.push(`missing ${path}`)}
if(files.length!==36)fail.push(`expected 36 HTML, found ${files.length}`);
const combined=(await Promise.all(files.map(file=>readFile(file,"utf8")))).join("\n");
for(const required of ["app.mcyj.examprep.kor0001","Q-Net Information Processing Engineer","5과목 · 100문항","필답형 · 150분","과목 40 · 평균 60","App Store · 출시 예정"])if(!combined.includes(required))fail.push(`missing ${required}`);
for(const forbidden of ["apps.apple.com","ToKL","90문항 · 130분","객관식 80 + 주관식 10","급수 121+","사회복지사","주택관리사보"])if(combined.includes(forbidden))fail.push(`stale content found: ${forbidden}`);
const css=await readFile(join(out,"assets","styles.css"),"utf8");
if(!css.includes("word-break:keep-all"))fail.push("keep-all rule missing");
if(!css.includes("store-badge-frame-sync"))fail.push("Store badge frame rule missing");
if(!css.includes("width:194px")||!css.includes("height:75px"))fail.push("194x75 Store frame missing");
if(fail.length){console.error(fail.join("\n"));process.exit(1)}
console.log(`Checked ${files.length} HTML files; metadata, links, page count, keep-all, Store state and equal badge frames passed.`);
