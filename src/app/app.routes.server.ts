import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'app/electronics/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'app/product/:id',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];