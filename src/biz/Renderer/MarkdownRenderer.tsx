const marked = require('marked');

const rendererArticle = new marked.Renderer();
// head
rendererArticle.heading = (text: string, orgLevel: number) => {
  const level = orgLevel + 1

  return `
          <h${level} id="h${level}_${text}">
            ${text}
          </h${level}>`;
};

export default rendererArticle;

const rendererProject = new marked.Renderer();
// head
rendererProject.heading = (text: string, orgLevel: number) => {
  const level = orgLevel + 2

  return `
          <h${level} id="h${level}_${text}">
            ${text}
          </h${level}>`;
};

export { rendererProject };

