document.getElementById('connectWallet').addEventListener('click', async () => {
  try {
    const provider = window.phantom?.solana;
    if (!provider || !provider.isPhantom) {
      alert("Phantom Wallet is not installed!");
      return;
    }

    const resp = await provider.connect();
    document.getElementById('walletAddress').innerText = `Connected: ${resp.publicKey.toString()}`;
  } catch (err) {
    console.error(err);
    alert("Connection was rejected.");
  }
});
