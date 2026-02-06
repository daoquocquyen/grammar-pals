import Link from "next/link";
import PetPanel from "../components/PetPanel";
import TopBar from "../components/TopBar";

const accessories = [
  { name: "Star Cape", status: "owned" },
  { name: "Leaf Hat", status: "owned" },
  { name: "Rain Boots", status: "locked" },
  { name: "Moon Mask", status: "locked" },
];

export default function ClosetPage() {
  return (
    <main className="screen">
      <TopBar />
      <section className="panel closet-card">
        <div>
          <p className="eyebrow">Accessories</p>
          <h1>Pick a look</h1>
          <p className="subtext">Tap an owned item to equip it.</p>
        </div>
        <div className="closet-grid">
          {accessories.map((accessory) => (
            <button
              key={accessory.name}
              className={`closet-item closet-item--${accessory.status}`}
              type="button"
            >
              <span className="closet-icon" aria-hidden="true" />
              <span>{accessory.name}</span>
            </button>
          ))}
        </div>
      </section>

      <PetPanel
        message="Pick an owned accessory and your pal will try it on!"
        reaction="happy"
      />

      <div className="action-row">
        <Link className="btn btn-primary" href="/">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
