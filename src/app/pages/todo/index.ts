import { StatefulWidget } from "mftsccs-browser";
import { todoCreate } from "./create";
import { todoList } from "./list";
import "./todoStyles.css";

export class todoIndex extends StatefulWidget {
  before_render(): void {
    this.render();
  }

  getHtml(): string {
    return `
    <div class="todo-wrapper">
      <div id="todo-create-widget"></div>
      <div id="todo-list-widget"></div>
    </div>
  `;
  }

  after_render(): void {
    const createContainer = this.getElementById("todo-create-widget");
    const listContainer = this.getElementById("todo-list-widget");

    const createWidget = new todoCreate();
    const listWidget = new todoList();

    if (createContainer) {
      this.childWidgets.push(createWidget);
      createWidget.mount(createContainer);
    }

    if (listContainer) {
      listWidget.dataChange((taskData: any) => {
        this.UpdateChildData(taskData, createWidget);
      });

      this.childWidgets.push(listWidget);
      listWidget.mount(listContainer);
    }
  }
}
