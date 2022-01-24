import { useState, Fragment } from "react";
import UpModal from "./UpModal";

function Footer() {
  const [keyboardShortcutsOpen, setKeyboardShortcutsOpen] = useState(false);

  const shortcuts = {
    Esc: "Exit new task / new bucket form",
    Enter: "Submit new task / new bucket on the form",
    "Double click on a bucket": "View the tasks within the bucket",
    b: "Open new bucket form",
    n: "Open new task form (when a stage is open)",
    s: "New stage (when a bucket is toggled)",
  };

  return (
    <div>
      <UpModal isOpen={keyboardShortcutsOpen} setIsOpen={setKeyboardShortcutsOpen} wide={true}>
        <div className="opacity-50">
          <p className="font-bold mb-8">
            The Prioritizer has a goal to enable you to go through your entire workflow process of creating tasks, buckets, and stages without your
            hands leaving your keyboard.
          </p>
          <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 2fr" }}>
            {Object.keys(shortcuts).map((key, index) => (
              <Fragment key={key}>
                {index > 0 && <hr className="col-span-2 my-4" />}
                <p value={key}>{key}</p>
                <p value={key}>{shortcuts[key]}</p>
              </Fragment>
            ))}
          </div>
          <p className="mt-12">We're still working on allowing bucket-toggling keyboard shortcuts (got any ideas)?</p>
        </div>
      </UpModal>
      <footer className="pb-8">
        <button className="link" onClick={() => setKeyboardShortcutsOpen(true)}>
          Keyboard shortcuts
        </button>
        <span className="link">
          <a href="https://github.com/laurgao/prioritizer/blob/main/README.md" target="_blank" rel="noreferrer">
            Philosophy
          </a>
        </span>
        <a className="link" href="https://twitter.com/laurgao" target="_blank" rel="noreferrer">
          Twitter
        </a>
      </footer>
    </div>
  );
}

export default Footer;
