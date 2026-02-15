"use client";

import Container from "@/components/Container";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Container className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Loading...</p>
      </Container>
    );
  }

  if (!session?.user) {
    return (
      <Container className="flex flex-col items-center justify-center min-h-[400px] gap-6">
        <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>
        <p className="text-gray-600">Sign in to view your profile.</p>
        <button
          onClick={() => signIn()}
          className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          Sign in
        </button>
      </Container>
    );
  }

  const { user } = session;

  return (
    <Container className="py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 flex flex-col items-center gap-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name ?? "Profile"}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-semibold text-gray-400 bg-gray-200">
                  {(user.name ?? user.email ?? "?")[0].toUpperCase()}
                </div>
              )}
            </div>
            <div className="text-center w-full space-y-1">
              {user.name && (
                <p className="text-lg font-semibold text-gray-900">{user.name}</p>
              )}
              {user.email && (
                <p className="text-gray-600 text-sm">{user.email}</p>
              )}
            </div>
            <button
              onClick={() => signOut()}
              className="mt-4 px-6 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:underline"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
