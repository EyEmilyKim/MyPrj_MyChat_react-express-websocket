const LeaveButton = ({ user, leaveRoom }) => {
  return (
    <div className="leave-button">
      <form onSubmit={leaveRoom}>
        <button type="submit">채팅방 나가기</button>
      </form>
    </div>
  );
};

export default LeaveButton;
