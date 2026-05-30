import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#3F2E1E] text-[#EDE7D9] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">D</span>
              </div>
              <div>
                <div className="font-semibold text-lg text-white tracking-tight">杜邦美達坦克</div>
                <div className="text-xs text-[#A67B5B]">授權經銷商</div>
              </div>
            </div>
            <p className="text-sm text-[#C5B9A6] leading-relaxed">
              台灣唯一取得杜邦高壓飾面碳化實木芯地板授權經銷商
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="font-medium text-white mb-4 tracking-wide text-sm">快速連結</div>
            <div className="space-y-2.5 text-sm">
              <Link href="/products" className="block hover:text-white transition-colors">所有產品</Link>
              <Link href="/#features" className="block hover:text-white transition-colors">產品特色</Link>
              <Link href="/blog" className="block hover:text-white transition-colors">知識部落格</Link>
            </div>
          </div>

          {/* Contact */}
          <div id="contact">
            <div className="font-medium text-white mb-4 tracking-wide text-sm">聯絡我們</div>
            <div className="space-y-2.5 text-sm text-[#C5B9A6]">
              <p>專人報價與施工諮詢</p>
              <a 
                href="tel:02-1234-5678" 
                className="block text-white hover:underline font-medium"
              >
                (02) 1234-5678
              </a>
              <a 
                href="mailto:service@dupontmetatank.com.tw" 
                className="block hover:text-white transition-colors"
              >
                service@dupontmetatank.com.tw
              </a>
              <p className="pt-2 text-xs">服務時間：週一至週五 09:00-18:00</p>
            </div>
          </div>

          {/* Authorization Notice - 非常重要 */}
          <div className="md:col-span-1">
            <div className="bg-white/5 rounded-xl p-5 text-xs leading-relaxed border border-white/10">
              <div className="font-medium text-[#A67B5B] mb-2">杜邦授權聲明</div>
              <p className="text-[#C5B9A6]">
                本網站為杜邦美達坦克（DuPont MetaTank）台灣授權經銷商官方網站。
                所有產品均享有杜邦官方 500 萬產品責任險保障，並通過 EPA NAF 無醛認證及台灣綠建材標章。
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#A67B5B]">
          <div>
            © {new Date().getFullYear()} 杜邦美達坦克授權經銷商 · 版權所有
          </div>
          <div className="flex gap-6">
            <span>隱私權政策</span>
            <span>服務條款</span>
            <span>杜邦官方認證</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
