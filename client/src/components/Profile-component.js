const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  return (
    <div style={{ margin: "3rem" }}>
      {!currentUser && <div>請先登入。。。</div>}
      {currentUser && (
        <div>
          <h2>個人檔案</h2>
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>用戶名: {currentUser.user.username}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>用戶ID: {currentUser.user._id}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Email: {currentUser.user.email}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>身分: {currentUser.user.role}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
