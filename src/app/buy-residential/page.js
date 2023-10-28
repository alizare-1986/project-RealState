import BuyResidentialPage from "@/template/BuyResidentialPage";


async function BuyResidential({ searchParams }) {
  const res = await fetch("http://localhost:3000/api/profile" );
  const data = await res.json();
  if (data.error) return <h3>مشکلی پیش آمده است</h3>;
  let finalData = data.data;
  if (searchParams.category) {
    finalData = finalData.filter((i) => i.category === searchParams.category);
  }

  return (
    <div>
      <BuyResidentialPage data={finalData} />
    </div>
  );
}

export default BuyResidential;
