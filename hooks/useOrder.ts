import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrder,
  fetchOrder,
  fetchOrders,
  updateOrderStatus,
} from "../services/order";

const useOrder = (id?: string) => {
  const queryClient = useQueryClient();

  const { data: orders } = useQuery(["orders"], fetchOrders, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: order } = useQuery(["order"], () => fetchOrder(id as string), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  return { order, orders, createOrderMutation, updateOrderStatusMutation };
};

export default useOrder;
