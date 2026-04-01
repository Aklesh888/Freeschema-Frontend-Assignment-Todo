import { DeleteConceptById, StatefulWidget } from "mftsccs-browser";

export class todoDelete extends StatefulWidget {
  before_render(): void {
    this.render();
  }

  getHtml(): string {
    return `<button id="delete-btn" class="btn-todo-delete" type="button">Delete</button>`;
  }

  after_render(): void {
    const deleteBtn = this.getElementById("delete-btn");
    const that = this;

    if (deleteBtn) {
      deleteBtn.onclick = () => {
        if (confirm("Are you sure you want to delete this task?")) {
          DeleteConceptById(that.data);
        }
      };
    }
  }
}
