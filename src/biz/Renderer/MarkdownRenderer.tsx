const marked = require('marked');

const rendererArticle = new marked.Renderer();
// head
rendererArticle.heading = (text: string, orgLevel: number) => {
  const level = orgLevel + 1

  return `<h${level} id="h${level}_${text}">
            ${text}
          </h${level}>`;
};
// link
rendererArticle.link = (href: string, title: string, text: string) => {
  return `<a href="${href}" target="_blank">${text}</a>`;
}

export default rendererArticle;

const rendererProject = new marked.Renderer();
// head
rendererProject.heading = (text: string, orgLevel: number) => {
  const level = orgLevel + 2

  return `<h${level} id="h${level}_${text}">
            ${text}
          </h${level}>`;
};
// link
rendererProject.link = (href: string, title: string, text: string) => {
  return `<a href="${href}" target="_blank">${text}</a>`;
}

export { rendererProject };

