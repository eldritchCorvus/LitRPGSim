import styled from "@emotion/styled";

export const Content = styled.div`
    padding: 10px;
`
function Birthday() {
  return (
    <div className="birthday-container">
      <div className="section">
        <Content>ZampanioSimulator is not a simulator and not a game and not a great many things. But the truth is that it IS an experience. One we can share together.  It is a reason for us all to create. And in the face of that crystaline Truth, does anything else really matter?</Content>
        <p>Note: This game is best played on a computer with sound enabled.</p>
      </div>
      <div className="section">
        The seed you choose will not matter.
        <input key={"date"} />
      </div>
      <div className="section">
        Only you can decide what is in your heart:
        <select>
          {["Your Truth","Is More Complex","Than Can Be Conveyed","By Four Words"].map((key) => { return (<option value={key}>{key}</option>) })}
        </select>
        <select>
        {["Your Truth","Is More Complex","Than Can Be Conveyed","By Four Words"].map((key) => { return (<option value={key}>{key}</option>) })}
        </select>
        <select>
        {["Your Truth","Is More Complex","Than Can Be Conveyed","By Four Words"].map((key) => { return (<option value={key}>{key}</option>) })}
        </select>
        <select>
        {["Your Truth","Is More Complex","Than Can Be Conveyed","By Four Words"].map((key) => { return (<option value={key}>{key}</option>) })}
        </select>
      </div>


      <div className="section">
        <a key={"link"} href={`?seed=${19720401}`}>Choice is Necessarily an Illusion.</a>
      </div>
    </div>
  );
}

export default Birthday;

