import MyAccount from "@/components/modules/user/account";
export const metadata = {
	title: "অ্যাকাউন্ট ড্যাশবোর্ড • Luxenta",
};
const AccountPage = () => {
	return (
		<div className="pb-15">
			<MyAccount />
		</div>
	);
};

export default AccountPage;
