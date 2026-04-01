import mainViewClass from "../../default/mainView.class";
import { checkLogin, getHeadingText, showAlert } from "./home.service";
import "./home.style.css";

export default class extends mainViewClass {
  constructor(params: any) {
    super(params);
    this.setTitle("Home");
  }

  async getHtml() {
    (window as any).showAlert = showAlert;
    const headingText = await getHeadingText();
    const isLoggedIn = await checkLogin();
    let buttonsHTML = "";
    if (isLoggedIn) {
      buttonsHTML = `
      <router-link href="/logout">Logout</router-link>
      `;
    } else {
      buttonsHTML = `
        <router-link href="/register">Get Started</router-link>
        <router-link href="/login">Login</router-link>
      `;
    }
    return `
      <div class="home-container">
        <div class="header">
          <div class="header-logo">
            <img src="./images/freeschema-logo.png" alt="freeschema logo">
            <h1>Freeschema Framework</h1>
          </div>
          <div class="header-link">
            <p>View <a href="https://github.com/Mentor-Friends/Freeschema-Frontend" target="_blank">github</a> for more</p>
          </div>
        </div>

        <main class="main">
          <h1>Freeschema</h1>
          <p class="heading-text">${headingText}</p>
          <p class="welcome-text">Welcome to freeSCHEMA, a powerful platform designed to simplify data management and software development, reducing development time by 50-75%. Whether you are a front-end developer or a full-stack developer.</p>
          <!-- <button onclick="showAlert()">Show alert</button> -->
          <div class="btn-group">
            ${buttonsHTML}
          </div>
        </main>

        <div class="footer">
          <div>
            <h3><a href="https://documentation.freeschema.com/" target="_blank">Freeschema Frontend
                Documentation</a></h3>
            <p>Topics, references, and how-to's</p>
          </div>
          <div>
            <h3><router-link href="/phonebook">Example: Phonebook App</router-link></h3>
            <p>Get Started with Freeschema Frontend</p>
          </div>
          <div>
            <h3><a href="https://github.com/Mentor-Friends/FreeschemaFrontendDocs/issues" target="_blank">Freeschema Frontend Community</a></h3>
            <p>Connect get help, or contribute</p>
          </div>
        </div>
      </div>
    `;
  }
}
