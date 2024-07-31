import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { type Medicine } from "@prisma/client";
import { useEffect, useState } from "react";
import MedicineCard from "./MedicineCard";
import MedicineCardSkeleton from "../MedicineCardSleketon";

export default function MedicinaMain() {

    const [medicines, setMedicines] = useState<Medicine[]>();
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const getMedicines = async (page = 1, limit = 6, pagination = true) => {
        setIsLoading(true);

        try {
            const response = await fetch(
                `http://localhost:4321/api/medicine/medicines?page=${page}&limit=${limit}&pagination=${pagination}`,
            );
            const data = await response.json();
            setMedicines(data.medicines);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        getMedicines(currentPage);
    }, [currentPage])

    return (
        <section className="flex flex-col medicines-center mb-4">
            <h3
                className="text-center font-bold text-3xl mt-5 mb-20 dark:text-white uppercase"
            >
                Medicines
            </h3>
            {isLoading && <MedicineCardSkeleton />}
            <article className="grid grid-cols-12 gap-20 xl:mx-20 mx-8 md:mx-auto">
                {!isLoading &&
                    (
                        medicines?.map((item: any) => {
                            return (

                                <MedicineCard
                                    id={item.id}
                                    name={item.name}
                                    price={item.price}
                                />
                            );
                        })
                    )
                }

            </article>
            <div className="mt-20">
                <Pagination className="dark:text-white">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink onClick={() => setCurrentPage(index + 1)} isActive={index + 1 === currentPage}>{index + 1}</PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </section>
    )
}