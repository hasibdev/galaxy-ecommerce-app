export default async function auth({ next, router }) {
  const isFirst = localStorage.getItem('onboarding')
  if (!isFirst) return router.push('/onboarding')

  return next()
}
