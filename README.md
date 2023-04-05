# Axelar Satellite

### Standards

- Eslint
- 2 spaces tabs
- use barrel exports
- use named expors instead of default ones (tree shaking)
- make sure prettify is configured in your vs code (cmd + p and "> format document", then select prettify)
- use react-query for remote data fetching
- [pnpm](https://pnpm.io)

### Project structure (inspired by atomic design)

```
.
├── components -> reusable/global components
├── features -> self contained complex components
├── hooks -> global hooks
├── pages -> main screens + nextjs specifics
├── store -> global store
```

### Bundle analyzer

```bash
ANALYZE=true pnpm build
```
