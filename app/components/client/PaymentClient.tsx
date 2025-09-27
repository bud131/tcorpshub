"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Background from "@/components/Background";

const stripePromise = loadStripe(
  "pk_live_51RQdxAA1aYvwuGmfKYOsuJAcv71FCLFdAp4aK1Hlpr4eFivF6cIE1K7Ki9eRk56D7OMntKORuiHBbW2fGVg4Krll00jSoL5cMs"
);

function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: { card },
    });

    if (result.error) {
      alert(`Payment failed: ${result.error.message}`);
    } else if (result.paymentIntent?.status === "succeeded") {
      alert("✅ Payment succeeded!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#fff",
              fontFamily: "Arial, sans-serif",
              "::placeholder": { color: "#ccc" },
            },
            invalid: { color: "#e53935" },
          },
        }}
        className="border border-gray-300 px-4 py-3 rounded-md"
      />
      <button
        type="submit"
        className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 shadow"
      >
        Complete Payment
      </button>
    </form>
  );
}

export default function PaymentPage() {
  const [paymentType, setPaymentType] = useState<"crypto" | "fiat" | "">("");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const qrMap: Record<string, string> = {
  bitcoin:  "btc.png",
  ethereum: "eth.png",
  bnb:      "bnb.png",
  arbitrum: "Arb.png",
  optimism: "opt.png",
  solana:   "sol.png",
  polygon:  "polygon.png",
  tron:     "tron.png",
};

  const networks = [
  {
    key: "bitcoin",
    name: "Bitcoin (Native)",
    tokensDescription: "BTC only.",
    address: "bc1qwk7hycrd3kavlvxv4w3mafd500gf8kpmrp0d83",
  },
  {
    key: "ethereum",
    name: "Ethereum (ERC-20)",
    tokensDescription: "ETH, USDT, USDC, DAI, LINK, etc.",
    address: "0x4dcE868911415b4E70E2E7F2f96D21Df9DBC4a27",
  },
  {
    key: "bnb",
    name: "BNB Smart Chain (BEP-20)",
    tokensDescription: "BNB, USDT, USDC, BUSD, CAKE, etc.",
    address: "0x4dcE868911415b4E70E2E7F2f96D21Df9DBC4a27",
  },
  {
    key: "arbitrum",
    name: "Arbitrum One (ERC-20)",
    tokensDescription: "ETH, ARB, USDT, USDC, etc.",
    address: "0x4dcE868911415b4E70E2E7F2f96D21Df9DBC4a27",
  },
  {
    key: "optimism",
    name: "Optimism (ERC-20)",
    tokensDescription: "ETH, OP, USDT, USDC, etc.",
    address: "0x4dcE868911415b4E70E2E7F2f96D21Df9DBC4a27",
  },
  {
    key: "solana",
    name: "Solana (SPL)",
    tokensDescription: "SOL, USDT, USDC, etc.",
    address: "HtW5f1qbVUK1dgCaLhWCv1wUVsH4H3jdrhchZpeg9xZg",
  },
      {
  key: "polygon",
  name: "Polygon (POL)",
  tokensDescription: "POL (ex-MATIC), USDT, USDC, DAI, AAVE, SAND, QUICK, etc.",
  address: "0x4dcE868911415b4E70E2E7F2f96D21Df9DBC4a27",
  },
  {
    key: "tron",
    name: "Tron (TRC-20)",
    tokensDescription: "TRX, USDT, USDC, etc.",
    address: "TTQ2n8BUPgsCo9g6mtDVZ7JACyDyGiiFwJ",
  },
];

  const currentNetwork = networks.find((n) => n.key === selectedNetwork);

  return (
    <>
      <Background />
      <Header />
      <main className="text-white min-h-screen px-4 pt-[120px] pb-12">
        <section className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-3xl font-bold text-center underline decoration-blue-600 decoration-4 underline-offset-4">
            Payments
          </h1>

          <div className="flex justify-center gap-8">
            {["crypto", "fiat"].map((type) => (
              <label key={type} className="flex items-center gap-2 text-lg text-white">
                <input
                  type="radio"
                  name="paymentType"
                  value={type}
                  checked={paymentType === type}
                  onChange={() => setPaymentType(type as "crypto" | "fiat")}
                  className="w-4 h-4"
                />
                {type === "crypto" ? "Crypto" : "Card / Stripe"}
              </label>
            ))}
          </div>

          {paymentType === "fiat" && (
            <div className="space-y-4">
              <label className="block text-lg font-medium">Amount (USD):</label>
              <input
                type="number"
                value={amount || ""}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= 5 && val <= 2005) setAmount(val);
                }}
                min={5}
                max={2005}
                step={5}
                className="w-full max-w-md border border-gray-500 bg-white text-black rounded-md px-4 py-2 text-lg"
                placeholder="e.g. 25"
              />
              {amount >= 5 && (
                <>
                  <p className="text-md mt-4 mb-2 text-white">
                    You will be charged ${amount.toFixed(2)} via Stripe.
                  </p>
                  <Elements stripe={stripePromise}>
                    <CheckoutForm amount={Math.round(amount * 100)} />
                  </Elements>
                </>
              )}
            </div>
          )}

          {paymentType === "crypto" && (
            <>
              <select
                value={selectedNetwork}
                onChange={(e) => setSelectedNetwork(e.target.value)}
                className="w-full max-w-md border border-gray-500 bg-black text-white rounded-md px-4 py-2 text-lg"
              >
                <option value="">-- Select Network --</option>
                {networks.map((net) => (
                  <option key={net.key} value={net.key}>
                    {net.name}
                  </option>
                ))}
              </select>

              {currentNetwork && (
                <div className="mt-6 text-center">
                  <img
                    src={`/${qrMap[currentNetwork.key]}`}
                    alt={`QR for ${currentNetwork.name}`}
                    className="mx-auto w-[60vw] max-w-[180px] border rounded-md shadow mb-4"
                  />
                  <p className="text-lg font-medium mb-2 text-white">Wallet Address:</p>
                  <div className="flex flex-wrap items-center justify-center gap-3 max-w-full break-all text-[#ffffff] text-center">

                    <span>{currentNetwork.address}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(currentNetwork.address);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="text-sm text-blue-400 underline hover:text-blue-600 ml-2"
                    >
                      {copied ? "✅ Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
