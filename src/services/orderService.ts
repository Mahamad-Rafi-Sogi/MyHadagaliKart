import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  query, 
  orderBy, 
  Timestamp,
  getDoc
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Order, OrderStatus } from '../types';

const ORDERS_COLLECTION = 'orders';

export const createOrder = async (orderData: Omit<Order, 'id' | 'status' | 'createdAt'> & { userId?: string }): Promise<string> => {
  try {
    const orderWithMetadata = {
      ...orderData,
      status: 'New' as OrderStatus,
      createdAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), orderWithMetadata);
    return docRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getOrders = async (): Promise<Order[]> => {
  try {
    const q = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        prompt: data.prompt,
        address: data.address,
        phoneNumber: data.phoneNumber,
        status: data.status,
        createdAt: data.createdAt.toDate(),
        userId: data.userId
      });
    });
    
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        prompt: data.prompt,
        address: data.address,
        phoneNumber: data.phoneNumber,
        status: data.status,
        createdAt: data.createdAt.toDate(),
        userId: data.userId
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(orderRef, { status });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};