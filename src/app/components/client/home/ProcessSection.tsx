export default function ProcessSection() {
  const steps = ["Research", "Strategy", "Execution", "Scale"]

  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-extrabold text-slate-900">
          Our Process
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
        {steps.map((step, index) => (
          <div key={step}
            className="p-8 bg-white rounded-2xl border border-slate-200 shadow">
            <div className="text-3xl font-bold text-teal-600 mb-4">
              0{index + 1}
            </div>
            <div className="font-semibold">{step}</div>
          </div>
        ))}
      </div>
    </section>
  )
}