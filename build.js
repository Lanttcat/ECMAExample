// read js example and convert to html
const fs = require('fs');
var rimraf = require("rimraf");

const basePath = process.cwd();
const exampleDirPath = `${basePath}/example/`;
const detailPageTemplateHTML = `${basePath}/detail_page_template.html`;
const indexTemplateHTML = `${basePath}/index_template.html`;
const docsDir = `${basePath}/docs/`;
const docsExampleDir = `${basePath}/docs/examples/`;

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

rimraf.sync(docsDir);
fs.mkdirSync(docsDir);
fs.mkdirSync(docsExampleDir);

examplesHTML.forEach((html) => {
  fs.writeFileSync(`${docsExampleDir}${html.name}.html`, html.data, {flag: "a"});
});

fs.writeFileSync(`${docsDir}index.html`, indexPageTemplateStr.replace(/{content}/g, renderIndexHTML(examplesHTML)));


