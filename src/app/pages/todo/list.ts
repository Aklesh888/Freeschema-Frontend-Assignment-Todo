import {
  FreeschemaQuery,
  SchemaQueryListener,
  StatefulWidget,
  JUSTDATA,
} from "mftsccs-browser";
import { getLocalUserId } from "../user/login.service";
import { todoDelete } from "./delete";

export class todoList extends StatefulWidget {
  todos: any[] = [];

  before_render(): void {
    const userId = getLocalUserId();

    const titleQuery = new FreeschemaQuery();
    titleQuery.typeConnection = "the_todo_title";
    titleQuery.name = "todoTitle";

    const mainQuery = new FreeschemaQuery();
    mainQuery.type = "the_todo";
    mainQuery.name = "top";
    // mainQuery.isSecure = true;
    mainQuery.freeschemaQueries = [titleQuery];
    mainQuery.outputFormat = JUSTDATA;
    mainQuery.selectors = [
      "the_todo_desc",
      "the_todo_priority",
      "the_todo_status",
    ];
    mainQuery.inpage = 50;

    SchemaQueryListener(mainQuery, "").subscribe((data: any) => {
      this.todos = data;
      this.render();
    });
  }

  after_render(): void {
    const tbody = this.getElementById("todo-tbody");
    if (!tbody) return;

    if (!this.todos || this.todos.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5">No tasks yet. Create one above!</td></tr>`;
      return;
    }

    this.todos.forEach((item: any) => {
      const id = item?.id;
      const data = item?.the_todo;
      const title = data?.the_todo_title?.the_todo_title?.data || "";
      const desc = data?.the_todo_desc?.the_todo_desc?.data || "";
      const priority = data?.the_todo_priority?.the_todo_priority?.data || "";
      const status = data?.the_todo_status?.the_todo_status?.data || "";

      if (!id) return;

      const row = document.createElement("tr");
      const col1 = document.createElement("td");
      const col2 = document.createElement("td");
      const col3 = document.createElement("td");
      const col4 = document.createElement("td");
      const col5 = document.createElement("td");

      col1.textContent = title;
      col2.textContent = desc;

      col3.innerHTML = `<span class="badge-priority badge-${priority}">${priority}</span>`;
      col4.innerHTML = `<span class="badge-status badge-${status}">${status}</span>`;

      const deleteWidget = new todoDelete();
      deleteWidget.data = id;
      deleteWidget.mount(col5);

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => {
        this.data = { id, title, desc, priority, status };
        this.notify();
      };

      const editCol = document.createElement("td");
      editCol.appendChild(editBtn);

      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      row.appendChild(editCol);
      row.appendChild(col5);
      tbody.appendChild(row);
    });
  }

  getHtml(): string {
    return `
    <div class="todo-card">
      <h2>My Tasks</h2>
      <table class="todo-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody id="todo-tbody"></tbody>
      </table>
    </div>
  `;
  }
}
