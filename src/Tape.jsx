import "./Tape.css";

const Tape = ({ position }) => {
  return <div className={`tape tape-${position}`} />;
};

export default Tape;
