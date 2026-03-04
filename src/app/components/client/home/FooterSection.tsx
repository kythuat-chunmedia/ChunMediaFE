export default function FooterSection() {
  return (
    <footer className="py-16 px-6 bg-slate-900 text-slate-400">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-white font-bold mb-4">ChunMedia</h3>
          <p>Tech-driven Media Agency.</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Links</h4>
          <ul className="space-y-2">
            <li>Home</li>
            <li>Services</li>
            <li>Portfolio</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <p>Email: contact@chunmedia.vn</p>
        </div>
      </div>

      <div className="mt-12 text-center text-sm">
        © 2026 ChunMedia. All rights reserved.
      </div>
    </footer>
  )
}