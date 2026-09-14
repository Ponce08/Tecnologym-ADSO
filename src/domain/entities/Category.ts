export class Category {
  constructor(
    public readonly id: string,
    private _name: string,
    private _description: string | null,
    private _active: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  get name(): string {
    return this._name;
  }

  get description(): string | null {
    return this._description;
  }

  get active(): boolean {
    return this._active;
  }

  rename(name: string): void {
    this._name = name;
  }

  changeDescription(description: string | null): void {
    this._description = description;
  }

  deactivate(): void {
    this._active = false;
  }

  activate(): void {
    this._active = true;
  }
}
