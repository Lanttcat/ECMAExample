// read js example and convert to html
const fs = require('fs-extra');
const rimraf = require("rimraf");

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
    .map((({name}) => `<p><a href="/ECMAExample/examples/${name}.html">${name.replace(/_/, " ")}</a></p>`))
    .join("\n");
}

async function copyHighLightPlugin() {
    try {
        await fs.copy(`${basePath}/libs`, `${docsDir}libs`);
        console.log('Copy highLight plugin success!')
    } catch (err) {
        console.error(err)
    }
}

async function copyStyleFile() {
    try {
        await fs.copy(`${basePath}/style`, `${docsDir}style`);
        console.log('Copy style file success!');
    } catch (err) {
        console.error(err)
    }
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

copyHighLightPlugin();
copyStyleFile();

