import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from 'lucide-react';

const Header = () => {
    const [showSignIn, setShowSignIn] = useState(false);
    const [search, setSearch] = useSearchParams();
    const { user } = useUser();
    useEffect(() => {
        if (search.get("sign-in")) {
            setShowSignIn(true);
        }
    }, [search]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowSignIn(false);
            setSearch({});
        }
    }
    return (
        <>
            <nav className='py-4 flex justify-between items-center'>
                <Link className="flex items-center">
                    <svg
                        className="w-10 h-10 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 2C10.343 2 9 3.343 9 5s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm-2 9a2 2 0 00-2 2v8h2v-6h4v6h2v-8a2 2 0 00-2-2h-4z"
                        />
                    </svg>
                    <h2 className="text-3xl font-bold text-white">HirrMe</h2>
                </Link>
                <div className='flex gap-8'>
                    <SignedOut>
                        <Button variant="outline" onClick={() => setShowSignIn(true)}>Login</Button>
                    </SignedOut>
                    <SignedIn>
                        {/* add a condition */}
                        {user?.unsafeMetadata?.role === "recruiter" && (
                            <Link to="/post-job">
                                <Button variant="destructive" className="rounded-full">
                                    <PenBox size={20} className="mr-2" />
                                    Post a Job
                                </Button>
                            </Link>
                        )}
                        <UserButton appearance={{
                            elements: {
                                avatarBox: "w-10 h-10",
                            }
                        }}>
                            <UserButton.MenuItems>
                                <UserButton.Link label='My Jobs' labelIcon={<BriefcaseBusiness size={15} />} href='/my-jobs' />
                                <UserButton.Link label='Saved Jobs' labelIcon={<Heart size={15} />} href='/saved-jobs' />
                            </UserButton.MenuItems>
                        </UserButton>
                    </SignedIn>
                </div>
            </nav>

            {showSignIn &&
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50' onClick={handleOverlayClick}>
                    <SignIn signUpForceRedirectUrl="/onboarding" fallbackRedirectUrl='/onboarding' />
                </div>}
        </>
    )
}

export default Header