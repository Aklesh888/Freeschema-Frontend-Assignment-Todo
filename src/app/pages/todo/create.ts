import {
  MakeTheInstanceConceptLocal,
  MakeTheTypeConceptLocal,
  CreateTheConnectionLocal,
  DeleteConnectionByType,
  LocalSyncData,
  StatefulWidget,
  PRIVATE
} from "mftsccs-browser";
import { getLocalUserId } from "../user/login.service";

export class todoCreate extends StatefulWidget {

  before_render(): void {
    this.render();
  }

  getHtml(): string {
  return `
    <div class="todo-card">
      ${this.data ? '<div class="todo-edit-banner">✎ Editing task — make your changes and save</div>' : ''}
      <h2>${this.data ? 'Edit Task' : 'Create Task'}</h2>
      <form>
        <input type="hidden" id="todo-id" value="${this.data?.id || ''}">
        <div class="todo-form-group">
          <label>Title</label>
          <input type="text" id="todo-title" placeholder="Task title..." />
        </div>
        <div class="todo-form-group">
          <label>Description</label>
          <textarea id="todo-desc" placeholder="Description (optional)..."></textarea>
        </div>
        <div class="todo-form-group">
          <label>Priority</label>
          <select id="todo-priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div class="todo-form-row">
          <button id="todo-submit" class="btn-todo-primary" type="submit">
            ${this.data ? 'Save Changes' : 'Add Task'}
          </button>
          ${this.data ? '<button id="todo-cancel" class="btn-todo-cancel" type="button">Cancel</button>' : ''}
        </div>
      </form>
    </div>
  `;
}

  after_render(): void {
    const userId = getLocalUserId();

    const titleInput = this.getElementById("todo-title")    as HTMLInputElement;
    const descInput = this.getElementById("todo-desc")     as HTMLTextAreaElement;
    const priorityInput = this.getElementById("todo-priority") as HTMLSelectElement;
    const idInput = this.getElementById("todo-id")       as HTMLInputElement;
    const submitBtn = this.getElementById("todo-submit");
    const cancelBtn = this.getElementById("todo-cancel");

    if (this.data) {
      titleInput.value = this.data.title    || "";
      descInput.value = this.data.desc     || "";
      priorityInput.value = this.data.priority || "medium";
    }

    if (submitBtn) {
      submitBtn.onclick = (e: Event) => {
        e.preventDefault();

        const title = titleInput.value.trim();
        const desc = descInput.value.trim();
        const priority = priorityInput.value;
        const editId = idInput.value;

        if (!title) {
          alert("Please enter a task title.");
          return;
        }

        if (editId) {
          const id = Number(editId);
          DeleteConnectionByType(id, "the_todo_title").then(() => {
            DeleteConnectionByType(id, "the_todo_desc").then(() => {
              DeleteConnectionByType(id, "the_todo_priority").then(() => {
                this.attachConnections(id, title, desc, priority, userId);
              });
            });
          });
        } else {
          MakeTheInstanceConceptLocal("the_todo", "", true, userId, PRIVATE)
            .then((mainConcept) => {
              this.attachConnections(mainConcept.id, title, desc, priority, userId);
            });
        }
      };
    }

    if (cancelBtn) {
      cancelBtn.onclick = () => {
        this.data = null;
        this.notify();
      };
    }
  }

  attachConnections(mainId: number, title: string, desc: string, priority: string, userId: number): void {
    const order = 1000;

    MakeTheTypeConceptLocal("the_todo_title", 999, 999, userId).then((titleType) => {
    MakeTheTypeConceptLocal("the_todo_desc", 999, 999, userId).then((descType) => {
    MakeTheTypeConceptLocal("the_todo_priority", 999, 999, userId).then((priorityType) => {
    MakeTheTypeConceptLocal("the_todo_status", 999, 999, userId).then((statusType) => {

      MakeTheInstanceConceptLocal("the_todo_title",    title,    false, userId, PRIVATE).then((titleConcept) => {
      MakeTheInstanceConceptLocal("the_todo_desc",     desc,     false, userId, PRIVATE).then((descConcept) => {
      MakeTheInstanceConceptLocal("the_todo_priority", priority, false, userId, PRIVATE).then((priorityConcept) => {
      MakeTheInstanceConceptLocal("the_todo_status",   "active", false, userId, PRIVATE).then((statusConcept) => {

        CreateTheConnectionLocal(mainId, titleConcept.id,    titleType.id,    order, "the_todo_title",    userId).then(() => {
        CreateTheConnectionLocal(mainId, descConcept.id,     descType.id,     order, "the_todo_desc",     userId).then(() => {
        CreateTheConnectionLocal(mainId, priorityConcept.id, priorityType.id, order, "the_todo_priority", userId).then(() => {
        CreateTheConnectionLocal(mainId, statusConcept.id,   statusType.id,   order, "the_todo_status",   userId).then(() => {

          LocalSyncData.SyncDataOnline();

        });});});});
      });});});});
    });});});});
  }
}