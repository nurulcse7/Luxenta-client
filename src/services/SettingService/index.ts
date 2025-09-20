import { getValidToken } from "@/lib/verifyToken";


// ---------------- GET ALL ----------------
export const getSettings = async () => {
    const accessToken = await getValidToken();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/settings/all`, {
            method: "GET",
            headers: {
                Authorization: `${accessToken}`,
            },
        });

        const result = await res.json();
        return result;
    } catch (error: any) {
        console.error("🚀 ~ getSettings ~ error:", error);
        return { success: false, error: error.message || "Something went wrong" };
    }
};
