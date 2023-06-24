export default class Service{
    
    static async Register(body){
        try {
            const response = await fetch(`/register`, {
                'method': 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body
            });
            return await response.json();
            
        } catch (error) {
            console.log(error);
            return "";
        }
    }

    static async RegisterOtp(body){
        try {
            const response = await fetch(`/register_otp`, {
                'method': 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            return await response.json();
        } catch (error) {
            console.log(error);
            return "";
        }
    }

    static async Login(body){
        try {
            const response = await fetch(`/login`, {
                'method': 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            return await response.json();
        } catch (error) {
            console.log(error);
            return "";
        }
    }

    static async CheckEmail(body){
        try {
            const response = await fetch(`/check_email`, {
                'method': 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body
            });
            return await response.json();
            
        } catch (error) {
            console.log(error);
            return "";
        }
    }
    static async CheckOtp(body){
        try {
            const response = await fetch(`/check_otp`, {
                'method': 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body
            });
            return await response.json();
            
        } catch (error) {
            console.log(error);
            return "";
        }
    }
    static async ChangePswd(body){
        try {
            const response = await fetch(`/change_pswd`, {
                'method': 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            return await response.json();
            
        } catch (error) {
            console.log(error);
            return "";
        }
    }
    static async Resend(){
        try {
            const response = await fetch(`/resend`, {
                'method': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return await response.json();
        } catch (error) {
            console.log(error);
            return "";
        }
    }

    static async CheckLogin(){
        try {
            const response = await fetch(`/checklogin`, {
                'method': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return await response.json();
        } catch (error) {
            console.log(error);
            return "";
        }
    }

    static async Logout(){
        try {
            const response = await fetch(`/logout`, {
                'method': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return await response.json();
        } catch (error) {
            console.log(error);
            return "";
        }
    }

    static async GetNotes(){
        try {
            const response = await fetch(`/getNotes`, {
                'method': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return await response.json();
        } catch (error) {
            console.log(error);
            return "";
        }
    }

    static async SaveNotes(body){
        try {
            const response = await fetch(`/saveNotes`, {
                'method': 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            return await response.json();
            
        } catch (error) {
            console.log(error);
            return "";
        }
    }

    static async DeleteNotes(body){
        try {
            const response = await fetch(`/deleteNotes`, {
                'method': 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body
            });
            return await response.json();
            
        } catch (error) {
            console.log(error);
            return "";
        }
    }
}