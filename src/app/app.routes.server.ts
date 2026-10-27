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
    path: 'store/electronics/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'store/product/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'admin/modules/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];