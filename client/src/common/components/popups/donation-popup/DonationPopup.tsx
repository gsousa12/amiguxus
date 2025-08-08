import React, { useState } from "react";

const DonationPopUp: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const PIX_DATA = {
    receiver: "Associação Bicho Cuidado Crateús",
    pixKey: "bicho.cuidado@ong.org",
    keyType: "E-mail",
    bank: "Banco do Brasil",
    cpfCnpj: "12.345.678/0001-90",
    city: "Crateús - CE",
    copyPaste:
      "00020126580014BR.GOV.BCB.PIX0136bicho.cuidado@ong.org520400005303986540510.005802BR5925Associacao Bicho Cuidado6009Crateus62070503***6304ABCD",
  };

  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  const copyToClipboard = async (
    text: string,
    setFlag: (v: boolean) => void
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setFlag(true);
      setTimeout(() => setFlag(false), 1800);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setFlag(true);
      setTimeout(() => setFlag(false), 1800);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="donation-title"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="absolute left-8 top-8 text-6xl opacity-20 motion-safe:animate-bounce">
          🐶
        </span>
        <span className="absolute right-10 top-14 text-5xl opacity-20 motion-safe:animate-bounce">
          🐱
        </span>
        <span className="absolute left-10 bottom-10 text-7xl opacity-10 motion-safe:animate-pulse">
          🐾
        </span>
      </div>

      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto
       rounded-3xl border border-rose-100 bg-white p-6 md:p-7 shadow-xl"
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 rounded-full p-2 hover:cursor-pointer
           text-rose-700 transition hover:bg-rose-50"
        >
          ✖
        </button>

        <div className="mb-4">
          <div
            className="mb-2 inline-flex items-center gap-2 rounded-full
           bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700"
          >
            <span className="text-rose-500">❤️</span>
            Doe via PIX
          </div>
          <h2
            id="donation-title"
            className="text-lg font-semibold text-gray-900"
          >
            Apoie a causa animal em Crateús
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Sua contribuição ajuda a manter o trabalho da{" "}
            <span className="font-semibold text-rose-700">
              Associação Bicho Cuidado Crateús
            </span>
            . Obrigado! 🐶🐱
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-4">
            <div className="text-sm text-gray-700">
              <div className="font-semibold text-rose-900">Recebedor</div>
              <div>{PIX_DATA.receiver}</div>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2">
              <div>
                <div className="font-semibold text-rose-900">Banco</div>
                <div>{PIX_DATA.bank}</div>
              </div>
              <div>
                <div className="font-semibold text-rose-900">CNPJ</div>
                <div>{PIX_DATA.cpfCnpj}</div>
              </div>
              <div>
                <div className="font-semibold text-rose-900">Cidade</div>
              </div>
              <div>{PIX_DATA.city}</div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm text-gray-600">
            Chave PIX ({PIX_DATA.keyType})
          </div>
          <div className="mt-1 flex items-center gap-2 rounded-xl border border-rose-200 bg-white p-3">
            <code className="break-all font-semibold text-rose-700">
              {PIX_DATA.pixKey}
            </code>
            <button
              type="button"
              onClick={() => copyToClipboard(PIX_DATA.pixKey, setCopiedKey)}
              className="ml-auto rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold
               text-white shadow-sm transition hover:cursor-pointer hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              {copiedKey ? "Copiado! ✅" : "Copiar chave"}
            </button>
          </div>
        </div>

        <div className="mt-3">
          <div className="text-sm text-gray-600">
            Código “copia e cola” (exemplo)
          </div>
          <div className="mt-1 rounded-xl border border-rose-200 bg-white p-3">
            <div className="max-h-24 overflow-auto text-xs leading-relaxed text-gray-700">
              {PIX_DATA.copyPaste}
            </div>
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(PIX_DATA.copyPaste, setCopiedPayload)
                }
                className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold
                 text-white shadow-sm transition hover:bg-rose-700 focus:outline-none 
                 focus:ring-2 focus:ring-rose-400 hover:cursor-pointer"
              >
                {copiedPayload ? "Copiado! ✅" : "Copiar código"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 grid place-items-center rounded-2xl border border-dashed border-rose-200 bg-rose-50/60 p-5 text-center">
          <p className="mt-2 text-xs text-rose-900/80">QR CODE ESTÁTICO </p>
        </div>

        <div className="mt-5 space-y-2 text-xs text-gray-600">
          <p>• Qualquer valor ajuda — muito obrigado pelo carinho! 🐾</p>
          <p>
            • Se quiser, envie o comprovante para nosso e-mail:
            amiguxus@email.com
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-rose-300 bg-white 
            px-4 py-2 text-sm font-semibold text-rose-700 transition 
            hover:bg-rose-50 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            Fechar
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
            }}
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold
             text-white shadow-sm transition hover:bg-rose-700 focus:outline-none 
             focus:ring-2 focus:ring-rose-400 hover:cursor-pointer"
          >
            Vou doar agora ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationPopUp;
