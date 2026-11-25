import { Injectable, signal } from '@angular/core';

export type DemoRole = 'manager' | 'analyst';

export interface DemoUser {
  id: string;
  name: string;
  role: DemoRole;
  roleLabel: string;
  initials: string;
}

const demoUsers: readonly DemoUser[] = [
  { id: 'manager-ana', name: 'Ana Martins', role: 'manager', roleLabel: 'Gestora', initials: 'AM' },
  { id: 'analyst-carlos', name: 'Carlos Henrique', role: 'analyst', roleLabel: 'Analista', initials: 'CH' },
  { id: 'analyst-marina', name: 'Marina Costa', role: 'analyst', roleLabel: 'Analista', initials: 'MC' },
  { id: 'analyst-rafael', name: 'Rafael Lima', role: 'analyst', roleLabel: 'Analista', initials: 'RL' },
  { id: 'analyst-joana', name: 'Joana Alves', role: 'analyst', roleLabel: 'Analista', initials: 'JA' },
];

@Injectable({ providedIn: 'root' })
export class DemoAuth {
  private readonly storageKey = 'fieldops-angular-demo-user';
  readonly users = demoUsers;
  readonly currentUser = signal<DemoUser | null>(this.getStoredUser());

  login(userId: string): void {
    const user = this.users.find((candidate) => candidate.id === userId);
    if (!user) throw new Error(`O perfil de demonstração "${userId}" não existe.`);

    sessionStorage.setItem(this.storageKey, user.id);
    this.currentUser.set(user);
  }

  logout(): void {
    sessionStorage.removeItem(this.storageKey);
    this.currentUser.set(null);
  }

  private getStoredUser(): DemoUser | null {
    const userId = sessionStorage.getItem(this.storageKey);
    return this.users.find((user) => user.id === userId) ?? null;
  }
}
