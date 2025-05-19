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
async function updateSolanaPrice() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true");
    const data = await res.json();
    const price = data.solana.usd.toFixed(2);
    const change = data.solana.usd_24h_change.toFixed(2);
    const changeText = change > 0 ? `+${change}%` : `${change}%`;

    const el = document.getElementById("sol-price");
    el.innerText = `SOL: $${price} (${changeText})`;
    el.style.color = change >= 0 ? "#0f0" : "#f00";
  } catch (e) {
    document.getElementById("sol-price").innerText = "SOL price unavailable";
  }
}

updateSolanaPrice();
setInterval(updateSolanaPrice, 30000);
