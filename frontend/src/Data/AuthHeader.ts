export default function AuthHeader() {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}');
    
    if (user.accessToken) {
      return 'Bearer ' + user.accessToken;
    } else {
      return '';
    }
  }
  