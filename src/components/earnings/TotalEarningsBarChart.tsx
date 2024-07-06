import { XAxis, Tooltip, YAxis, BarChart, Bar, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import useThemeStore from "@/stores/themeStore"

const data = [
  {
    "name": "Ibupirac 500",
    "moneyEarning": 5034,
    "quantity": 2400
  },
  {
    "name": "Ibupirac 500",
    "moneyEarning": 2321,
    "quantity": 3433
  },
  {
    "name": "Ibupirac 500",
    "moneyEarning": 1232,
    "quantity": 3333
  },
  {
    "name": "Ibupirac 500",
    "moneyEarning": 2321,
    "quantity": 232
  },
  {
    "name": "Ibupirac 500",
    "moneyEarning": 4333,
    "quantity": 5444
  },
]

export default function TotalEarningsBarChart() {

  const { darkMode } = useThemeStore();

  return (
    <ResponsiveContainer >
      <BarChart data={data} className="text-white">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fill: darkMode ? 'white' : 'black', fontWeight: "600" }} />
        <YAxis tick={{ fill: darkMode ? 'white' : 'black', fontWeight: "600" }} />
        <Tooltip />
        <Bar dataKey="moneyEarning" fill="#900C3F" />
        <Bar dataKey="quantity" fill="#581845" />
      </BarChart>
    </ResponsiveContainer>
  )
}

