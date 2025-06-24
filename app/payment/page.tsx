"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Background from "../components/Background";

const stripePromise = loadStripe("pk_live_51RQdxAA1aYvwuGmfKYOsuJAcv71FCLFdAp4aK1Hlpr4eFivF6cIE1K7Ki9eRk56D7OMntKORuiHBbW2fGVg4Krll00jSoL5cMs");

function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  if (!stripe || !elements) return;

  const card = elements.getElement(CardElement);
  if (!card) return;

  try {
    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card,
      },
    });

    if (result.error) {
      alert(`Payment failed: ${result.error.message}`);
    } else if (result.paymentIntent?.status === "succeeded") {
      alert("✅ Payment successful!");
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred while processing the payment.");
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="bg-white p-4 rounded-md" />
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Pay Now</Button>
    </form>
  );
}

export default function PaymentsPage() {
  const [amount, setAmount] = useState(0);
  const [paymentType, setPaymentType] = useState<"crypto" | "fiat" | "">("");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setAmount(Math.max(1, Math.min(value, 2000)));
  };

  const cryptoOptions: Record<string, string[]> = {
    "Bitcoin Network": ["Bitcoin (BTC) on Bitcoin Network"],
    "Etherium Network": ["Etherium (ETH) on Etherium Network", "Tether (USDT) on Etherium Network", "USDC on Etherium Network"],
    "BNB SmartChain Network": ["BNB on BNB Smart Chain", "USDT (Tether on BNB Smart Chain)", "USDC (USD-Coin on BNB)", "Solidus Ai-Tech (BNB Smart Chain)"],
    "Solana Network": ["Solana (SOL) on Solana Network", "MATIC on Solana", "Tether (USDT) on Solana", "USDC on Solana"],
    "Polygon Network": ["Polygon (MATIC) on Polygon", "Tether (USDT) on Polygon", "USDC on Polygon Network"],
    "Arbitrum Network": ["Arbitrum (ARB) on Etherium", "Arbitrum One (ETH) on Arbitrum", "Tether (USDT) on Arbitrum", "USDC on Arbitrum One Network"],
    "Avalanche Network": ["Avalanche (AVAX) on Avalanche", "Tether (USDT) on Avalanche"],
    "Tron Network": ["Tron (TRX) on Tron Network", "Tether (USDT) on Tron Network", "USDC on Tron Network"],
  };

  const imageMap: Record<string, string> = {
    "Bitcoin (BTC) on Bitcoin Network": "btc.png",
    "Etherium (ETH) on Etherium Network": "eth.png",
    "Tether (USDT) on Etherium Network": "eth_usdt.png",
    "USDC on Etherium Network": "eth_usdc.png",
    "BNB on BNB Smart Chain": "bnb.png",
    "USDT (Tether on BNB Smart Chain)": "bnb_usdt.png",
    "USDC (USD-Coin on BNB)": "bnb_usdc.png",
    "Solidus Ai-Tech (BNB Smart Chain)": "bnb_aitech.png",
    "Solana (SOL) on Solana Network": "solana_sol.png",
    "MATIC on Solana": "solana_matic.png",
    "Tether (USDT) on Solana": "solana_usdt.png",
    "USDC on Solana": "solana_usdc.png",
    "Polygon (MATIC) on Polygon": "polygon_matic.png",
    "Tether (USDT) on Polygon": "polygon_usdt.png",
    "USDC on Polygon Network": "polygon_usdc.png",
    "Arbitrum (ARB) on Etherium": "arbitrum_arb.png",
    "Arbitrum One (ETH) on Arbitrum": "arbitrum_eth.png",
    "Tether (USDT) on Arbitrum": "arbitrum_usdt.png",
    "USDC on Arbitrum One Network": "arbitrum_usdc.png",
    "Avalanche (AVAX) on Avalanche": "avalanche_avax.png",
    "Tether (USDT) on Avalanche": "avalanche_usdt.png",
    "Tron (TRX) on Tron Network": "tron_trx.png",
    "Tether (USDT) on Tron Network": "tron_usdt.png",
    "USDC on Tron Network": "tron_usdc.png",
  };

  const getImageName = () => {
    if (!selectedCrypto) return "";
    return imageMap[selectedCrypto] || "";
  };

  const getWalletAddress = () => {
    const key = selectedNetwork.toLowerCase();
    if (key.includes("bitcoin")) return "bc1qldhx02mqxmstddwc58agjq7u05egwx9qkdqnhw";
    if (key.includes("solana")) return "BkaqB1nqzDMnnsMXR3RbKfPyW2A7BX6GkygSGsQZtELw";
    if (key.includes("tron")) return "TSUoyLVPQP9hZrEiUvcPK7fQVfD6TNk5ca";
    if (["polygon", "etherium", "arbitrum", "bnb", "avalanche"].some(n => key.includes(n))) {
      return "0xff79ABc8986210a352C2e3ea10Cb67e07d2Ce04f";
    }
    return "";
  };

  return (
    <>
      <Background />
      <Header />
      <main className="text-white min-h-screen px-4 py-12">
        <section className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center underline decoration-blue-600 decoration-4 underline-offset-4">
            Payments
          </h1>

          <div className="bg-white/5 p-6 rounded-lg border border-white/10 space-y-6">
            <div className="space-y-4">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Select Payment Method
              </label>
              <div className="flex gap-4">
                <label>
                  <input type="radio" name="paymentType" value="crypto" onChange={() => setPaymentType("crypto")} checked={paymentType === "crypto"} /> Crypto Payment
                </label>
                <label>
                  <input type="radio" name="paymentType" value="fiat" onChange={() => setPaymentType("fiat")} checked={paymentType === "fiat"} /> Fiat Payment
                </label>
              </div>
            </div>

            {paymentType === "fiat" && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  💡 Enter the amount in USD you wish to send (min: $1, max: $2000)
                </label>
                <input
                  type="number"
                  min="1"
                  max="2000"
                  className="w-full px-4 py-2 rounded-md bg-black text-white border border-gray-600"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Amount in USD"
                />
              </div>
            )}

            {paymentType === "fiat" && amount > 0 && (
              <div className="space-y-4">
                <p className="text-gray-400 text-sm">
                  💡 Once you enter the amount, payment fields will appear below via Stripe.
                </p>
                <Elements stripe={stripePromise}>
                  <CheckoutForm amount={amount} />
                </Elements>
              </div>
            )}

            {paymentType === "crypto" && (
              <div className="space-y-4">
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Select Crypto Network
                </label>
                <select
                  className="w-full px-4 py-2 rounded-md bg-black text-white border border-gray-600"
                  value={selectedNetwork}
                  onChange={(e) => {
                    setSelectedNetwork(e.target.value);
                    setSelectedCrypto("");
                  }}
                >
                  <option value="">- Select -</option>
                  {Object.keys(cryptoOptions).map((network) => (
                    <option key={network} value={network}>{network}</option>
                  ))}
                </select>

                {selectedNetwork && cryptoOptions[selectedNetwork]?.length > 0 && (
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-400 mb-1">
                      {selectedNetwork} Options
                    </label>
                    <select
                      className="w-full px-4 py-2 rounded-md bg-black text-white border border-gray-600"
                      value={selectedCrypto}
                      onChange={(e) => setSelectedCrypto(e.target.value)}
                    >
                      <option value="">- Select -</option>
                      {cryptoOptions[selectedNetwork].map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedCrypto && (
                  <div className="text-center space-y-4 pt-6">
                    <img
                      src={`/${getImageName()}`}
                      alt="Crypto QR"
                      className="mx-auto rounded-md max-w-xs"
                    />
                    <p className="text-lg font-mono text-blue-400">{getWalletAddress()}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
