// /healthz for the status API and the container's HEALTHCHECK: 200 while the server can answer.
//
// Static on purpose: it checks that the process serves requests, not that the app's dependencies are up, so a
// slow dependency does not make Docker restart the container.
export const dynamic = 'force-static';

export function GET() {
  return new Response('ok', {
    status: 200,
    headers: { 'content-type': 'text/plain' },
  });
}
