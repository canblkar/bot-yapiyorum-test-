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
document.getElementById("buyNow").addEventListener("click", async () => {
  if (!window.phantom?.solana) {
    alert("Phantom Wallet is not installed!");
    return;
  }

  const provider = window.phantom.solana;
  await provider.connect();

  const txid = await buyToken(provider, 0.01); // 0.01 SOL ile alım yap
  alert("Transaction sent! Tx ID:\n" + txid);
});
