import {useState, type FormEvent} from "react";
import {useRouter} from "next/navigation";
import {Eye, EyeOff, Loader2, LockKeyhole, Mail, ShieldCheck} from "lucide-react";
import {toast} from "sonner";
import {useAuth} from "@/lib/auth-context";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import type {LoginCredentials} from "../_types/login";

export function LoginForm() {
    const [credentials, setCredentials] = useState<LoginCredentials>({email: "", password: ""});
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const {login} = useAuth();
    const router = useRouter();

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        setSubmitting(true);
        try {
            await login(credentials.email, credentials.password);
            toast.success("Welcome back. Signed in as HR.");
            router.replace("/employees");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Sign in failed.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-[390px]">
            <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-[#668273] uppercase">HR workspace</p>
            <h1 className="text-[32px] leading-tight font-semibold tracking-[-0.045em] sm:text-[36px]">Welcome back</h1>
            <p className="mt-2 text-[15px] leading-6 text-[#78847d]">Sign in to manage employees and attendance.</p>
            <form className="mt-9 space-y-5" onSubmit={submit}>
                <div className="space-y-2">
                    <Label className="text-[13px] font-medium text-[#35463c]" htmlFor="email">Work email</Label>
                    <div className="relative">
                        <Mail className="absolute top-1/2 left-4 size-[17px] -translate-y-1/2 text-[#98a49c]"/>
                        <Input id="email" type="email" required value={credentials.email}
                               onChange={(event) => setCredentials({...credentials, email: event.target.value})}
                               placeholder="Enter your email" className="h-12 pl-11 pr-4"/>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label className="text-[13px] font-medium text-[#35463c]" htmlFor="password">Password</Label>
                    <div className="relative">
                        <LockKeyhole className="absolute top-1/2 left-4 size-[17px] -translate-y-1/2 text-[#98a49c]"/>
                        <Input id="password" type={showPassword ? "text" : "password"} required
                               value={credentials.password}
                               onChange={(event) => setCredentials({...credentials, password: event.target.value})}
                               placeholder="Enter your password" className="h-12 px-11"/>
                        <button type="button" aria-label={showPassword ? "Hide password" : "Show password"}
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#98a49c]">
                            {showPassword ? <EyeOff className="size-[17px]"/> : <Eye className="size-[17px]"/>}
                        </button>
                    </div>
                </div>
                <Button size="lg" disabled={submitting} className="w-full shadow-[0_6px_14px_-7px_rgba(23,107,80,0.7)]">
                    {submitting ? <Loader2 className="mx-auto size-5 animate-spin"/> : "Sign in"}
                </Button>
            </form>
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#8a958e]">
                <ShieldCheck className="size-4 text-[#72927f]"/>
                Your workspace is private and secure
            </div>
        </div>
    );
}
