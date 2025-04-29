import { faker } from "@faker-js/faker"
import { writeFile } from "fs/promises"

// Liste de quelques départements
const departments = [
  "Sales",
  "Marketing",
  "Engineering",
  "Human Resources",
  "Legal",
]

const data = []
const totalEntries = 1000 // Nombre d'entrées à générer

for (let i = 0; i < totalEntries; i++) {
  // Génération de dates aléatoires
  const birthDate = faker.date.between({ from: "1958-01-01", to: "2004-01-01" }) // Date de naissance entre 1958 et 2004
  const startDate = faker.date.between({ from: "2013-01-01", to: new Date() }) // Date de début entre 2013 et aujourd'hui

  const record = {
    id: faker.string.uuid(), // Génère un UUID pour l'id
    firstName: faker.person.firstName(), // Génère un prénom
    lastName: faker.person.lastName(), // Génère un nom de famille
    birthDate: birthDate.toISOString().split("T")[0], // Convertit la date de naissance au format YYYY-MM-DD
    startDate: startDate.toISOString().split("T")[0], // Convertit la date de début au format YYYY-MM-DD
    address: {
      street: faker.location.streetAddress(), // Génère une adresse
      city: faker.location.city(), // Génère une ville
      state: faker.location.state(), // Génère un état
      zipCode: faker.number.int({ min: 10000, max: 99999 }).toString(), // Génère un code postal
    },
    department: departments[Math.floor(Math.random() * departments.length)], // Choisit un département aléatoire
  }

  data.push(record) // Ajoute l'enregistrement dans le tableau de données
}

// Génération du fichier JSON
await writeFile("mock_data.json", JSON.stringify(data, null, 4), "utf8")

console.log(
  `Le fichier 'mock_data.json' a été généré avec ${totalEntries} entrées.`
)
