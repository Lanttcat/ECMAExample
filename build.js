// read js example and convert to html
const fs = require('fs');
var rimraf = require("rimraf");

const basePath = process.cwd();
const exampleDirPath = `${basePath}/example/`;
const detailPageTemplateHTML = `${basePath}/detail_page_template.html`;
const indexTemplateHTML = `${basePath}/index_template.html`;
const buildDir = `${basePath}/build/`;
const buildExampleDir = `${basePath}/build/examples/`;

console.log(exampleDirPath);

const  detailPageTemplateStr = fs.readFileSync(detailPageTemplateHTML).toString();
const  indexPageTemplateStr = fs.readFileSync(indexTemplateHTML).toString();
const examples =  fs.readdirSync(exampleDirPath);

function renderIndexHTML(features) {
  return features
    .map((({name}) => `<p><a href="/examples/${name}.html">${name.replace(/_/, " ")}</a></p>`))
    .join("\n");
}

const examplesHTML = examples.map((example) => {
  const examplePath = `${exampleDirPath}${example}`;
  const jsExample = fs.readFileSync(examplePath).toString();

  return {
    data:detailPageTemplateStr
      .replace(/{title}/g, example)
      .replace(/{content}/g, jsExample),
    name: example
  }

});

rimraf.sync(buildDir);
fs.mkdirSync(buildDir);
fs.mkdirSync(buildExampleDir);

examplesHTML.forEach((html) => {
  fs.writeFileSync(`${buildExampleDir}${html.name}.html`, html.data, {flag: "a"});
});

fs.writeFileSync(`${buildDir}index.html`, indexPageTemplateStr.replace(/{content}/g, renderIndexHTML(examplesHTML)));


