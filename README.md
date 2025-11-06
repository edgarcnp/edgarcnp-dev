# edgarcnp.dev - Leptos Port

This is the Leptos version of the edgarcnp.dev website, migrated from Next.js to Rust + Leptos.

## Features

- Full-stack Rust application using Leptos framework
- Server-Side Rendering (SSR) with hydration
- Smooth animations and theme switching
- Responsive design with Tailwind CSS
- Client-side navigation

## Development

To run the project in development mode:

```bash
# Install cargo-leptos if you haven't already
cargo install cargo-leptos

# Install dependencies for CSS processing
cd frontend
npm install

# Run the project
cargo leptos watch
```

## Production Build

```bash
# Build for production
cargo leptos build --release
```

## 📄 License

Open source and available under the [GPLv3 License](LICENSE).

---
