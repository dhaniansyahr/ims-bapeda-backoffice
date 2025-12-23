import Illustrations from "./illustrations";
import LoginForm from "./login-form";

export default function Container() {
    return (
        <section className="h-screen w-full bg-[#F7F7F9]">
            <div className="h-full w-full p-4">
                <div className="grid h-full w-full grid-cols-3 gap-4">
                    <Illustrations />
                    <LoginForm />
                </div>
            </div>
        </section>
    );
}
