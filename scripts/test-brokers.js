(async () => {
  const ports = [3000, 3001];
  async function findBase() {
    for (const p of ports) {
      try {
        const res = await fetch(`http://localhost:${p}/api/brokers`, { method: 'GET' });
        if (res.ok) return `http://localhost:${p}`;
      } catch {
        // ignore
      }
    }
    throw new Error('No local dev server found on ports 3000 or 3001');
  }

  try {
    const base = await findBase();
    console.log('Using base URL:', base);

    const name = `Test Broker ${Date.now()}`;

    console.log('Creating broker:', name);
    await fetch(`${base}/api/brokers`, {
      method: 'POST',
      body: new URLSearchParams({ name, credentials: 'init-creds' }),
    });

    await new Promise((r) => setTimeout(r, 300));

    let res = await fetch(`${base}/api/brokers`);
    let list = await res.json();
    console.log('Brokers after create:', list.map((b) => ({ id: b.id, name: b.name, slug: b.slug, connected: b.connected })));

    const broker = list.find((b) => b.name === name);
    if (!broker) {
      console.error('Created broker not found');
      process.exit(2);
    }

    console.log('Connecting broker:', broker.slug);
    await fetch(`${base}/api/brokers/${broker.slug}/connect`, {
      method: 'POST',
      body: new URLSearchParams({ apiKey: 'key-123', secret: 'secret-xyz' }),
    });

    await new Promise((r) => setTimeout(r, 300));
    res = await fetch(`${base}/api/brokers`);
    list = await res.json();
    console.log('Brokers after connect:', list.find((b) => b.slug === broker.slug));

    console.log('Configuring broker:', broker.slug);
    await fetch(`${base}/api/brokers/${broker.slug}/configure`, {
      method: 'POST',
      body: new URLSearchParams({ mode: 'sandbox', webhook: 'https://example.com/webhook' }),
    });

    await new Promise((r) => setTimeout(r, 300));
    res = await fetch(`${base}/api/brokers`);
    list = await res.json();
    console.log('Brokers after configure:', list.find((b) => b.slug === broker.slug));

    console.log('Test finished successfully');
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
})();
