export default function DashboardHome() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        <DashboardCard titulo="Usuários" valor="1.245" />
        <DashboardCard titulo="Pedidos" valor="382" />
        <DashboardCard titulo="Receita" valor="R$ 18.920,00" />
        <DashboardCard titulo="Produtos" valor="98" />
      </div>
    );
  }
  
  function DashboardCard({ titulo, valor }: { titulo: string; valor: string }) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-sm text-gray-500">{titulo}</p>
        <p className="text-2xl font-semibold mt-1 text-blue-600">{valor}</p>
      </div>
    );
  }
  