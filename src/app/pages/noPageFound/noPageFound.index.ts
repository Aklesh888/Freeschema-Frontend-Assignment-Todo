import mainViewClass from "../../default/mainView.class";

export default class extends mainViewClass {
  constructor(params: any) {
    super(params);
    this.setTitle("404 | No Page Found");
  }

  async getHtml(): Promise<string> {
    return `
      <div class="no-page">
        <h1>404</h1>
        <h4>No page found</h4>
        <router-link href='/' class="btn btn-primary">Go Home</router-link>
      </div>
    `;
  }
}
