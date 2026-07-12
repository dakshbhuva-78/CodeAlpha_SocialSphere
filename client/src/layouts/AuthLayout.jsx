const AuthLayout = ({ children }) => {

    return (

        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">

            {/* Floating Glow */}

            <div className="absolute w-96 h-96 bg-blue-600/20 blur-[140px] rounded-full -left-40 -top-20 animate-pulse" />

            <div className="absolute w-96 h-96 bg-indigo-600/20 blur-[160px] rounded-full right-0 bottom-0 animate-pulse" />

            <div className="absolute w-60 h-60 bg-cyan-500/20 blur-[120px] rounded-full left-1/2 top-1/3 animate-pulse" />
            
            <div className="relative z-10 min-h-screen flex items-center justify-center px-5">

                {children}

            </div>

        </div>

    );

};

export default AuthLayout;